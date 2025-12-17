import Groq from 'groq-sdk';

// Initialize Groq client
const getGroqClient = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_GROQ_API_KEY is not defined. Please add it to your .env file');
  }

  return new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Required for client-side usage
  });
};

// Generic function to call Groq API
const callGroqAPI = async (systemMessage, userPrompt, temperature = 0.3, maxTokens = 2000) => {
  try {
    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: temperature,
      max_tokens: maxTokens,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
};

// Service object with all generation methods
export const groqService = {
  /**
   * Generate Summary field
   */
  async generateSummary(formData) {
    const systemMessage = `You are an expert QA specialist for Fortnite. Generate a clear, concise Summary for a Jira bug report.

SUMMARY STRUCTURE:
Create a logical title following this formula:
"What happened?" while "Doing what action?" in "Which context?"

CONTEXT PRIORITY (where to mention the bug occurs):
1. **Game Mode FIRST**: Battle Royale, Reload, Delulu, LEGO Fortnite, Festival, etc.
2. **POI/Location ONLY if critical**: Only mention specific POI (like "Mega City") if the bug ONLY happens there
3. **Screen/Menu**: If bug is in UI/menus (Settings, Lobby, Locker, etc.)

DECISION TREE FOR CONTEXT:
- Bug happens in multiple POIs but same mode? → Use game mode (e.g., "in Battle Royale")
- Bug ONLY at specific POI? → Use POI name (e.g., "at Mega City")
- Bug in menu/UI? → Use menu name (e.g., "in Settings Menu")
- Bug mode-specific? → Use mode (e.g., "in Reload", "in Festival")

FORMAT RULES:
1. Write as a single coherent sentence or phrase (NOT multiple short phrases separated by dashes)
2. Start with the main problem/symptom
3. Include the triggering action if relevant
4. End with game mode OR specific location (only if location-specific)
5. Maximum 120 characters
6. Capitalize important words (verbs, nouns, screen names, game modes)

BRACKET TAGS - ONLY use if the bug is one of these specific types:
- [NCL] = Network Connection Lost (disconnection issues)
- [Crash] = Application crashes to desktop/console
- [CDE] = Content Download Error
- [MME] = Matchmaking Error
- [Eternal Loading Screen] = Stuck on loading screen
- [Hang] = Application freezes/hangs
- [JSE] = Join Session Error
- [Softlock] = Player stuck, cannot continue

For OTHER bug types (gameplay, UI, visual, audio, etc.), DO NOT use brackets - just write a clear descriptive title.

EXAMPLES:
✅ "[Crash] Game Crashes When Opening Inventory While in Vehicle in Battle Royale" (mode-based)
✅ "Player Falls Through Map at Mega City Only" (POI-specific bug)
✅ "Weapon Damage Incorrect After Picking Up Shield in Reload" (mode-based)
✅ "Character T-Pose During Gameplay in Festival" (mode-based)
✅ "Settings Menu Text Truncated on PlayStation 5" (UI-based)
❌ "[Crash] Game Crashes When Opening Inventory in Vehicle Near Mega City" (POI not relevant)
❌ "[Crash] Opening inventory - In vehicle - Battle Royale" (too fragmented)

Respond with ONLY the summary title, no explanations.`;

    const userPrompt = `
BUG INFORMATION:
Description: ${formData.bugDescription}
What user was doing: ${formData.whatWasDoing}
Where it happened: ${formData.whereHappened}
Platform: ${formData.platforms?.join(', ')}
Mode: ${formData.experiencesImpacted?.join(', ')}

Generate the Summary:`;

    return await callGroqAPI(systemMessage, userPrompt, 0.3, 150);
  },

  /**
   * Generate Severity level
   */
  async generateSeverity(formData) {
    const systemMessage = `You are an expert QA specialist. Analyze bugs and determine severity level.

SEVERITY LEVELS:
1 = Game Breaker: Prevents playing completely (crashes, UI locks, repeated disconnections)
2 = Major Function: Big impact but playable (weapons not working, incorrect damage)
3 = Minor Function: Small impact, can be avoided (UI overlap, placeholders)
4 = Superficial: Only visual, doesn't affect gameplay (z-fighting, cosmetic glitches)

Respond with ONLY the number (1, 2, 3, or 4), nothing else.`;

    const userPrompt = `
BUG: ${formData.bugDescription}
IMPACT: ${formData.whatWasDoing}
REPRODUCTION RATE: ${formData.reproductionCount}
PLATFORMS: ${formData.platforms?.join(', ')}

What is the severity level?`;

    const result = await callGroqAPI(systemMessage, userPrompt, 0.2, 10);
    return result.trim();
  },

  /**
   * Generate Steps to Reproduce
   */
  async generateSteps(formData) {
    const systemMessage = `You are an expert QA specialist for Fortnite. Generate CONCISE Steps to Reproduce.

CRITICAL RULES - DO NOT INVENT INFORMATION:
1. ONLY use information explicitly provided by the user
2. DO NOT add steps about weapons, items, or actions the user didn't mention
3. DO NOT assume details that weren't provided
4. If the user gives minimal details, create minimal steps (3-4 steps is fine)
5. If the user gives many details, synthesize into 5-6 essential steps maximum

STEP STRUCTURE:
1. Keep steps minimal and essential for a developer to reproduce
2. One step per line, numbered
3. Use imperative verbs (Launch, Select, Land, Play, etc.)
4. Last step is the action that triggers the bug
5. DO NOT include "Observe the issue occurs" as a step

STEP COUNT GUIDELINES:
- Minimal context provided = 3-4 steps
- Medium context = 4-5 steps
- Detailed context = 5-6 steps MAX
- NEVER exceed 6 steps unless absolutely critical

FORMAT:
1. Launch (++Fortnite+[Branch]+CL-####) where:
   - [Branch] = version number provided by user (e.g., 39.10, 39.00)
   - #### = CL number provided by user
   - If no branch: use "Main"
   - Example: ++Fortnite+39.10+CL-38925561
2. Select [mode from user input]
3. [Action that leads to bug - from user description only]
4. [Triggering action - what causes the bug]

ACTUAL RESULT: [What actually happens - from user's bug description]
EXPECTED RESULT: [What should happen instead]

EXAMPLE - Minimal input:
User says: "My character went into T-pose during normal gameplay"
Branch: 39.10, CL: 38925561
GOOD output:
1. Launch ++Fortnite+39.10+CL-38925561
2. Select Battle Royale
3. Play a match
4. Character enters T-pose during gameplay

ACTUAL RESULT: Character model stuck in T-pose
EXPECTED RESULT: Character maintains normal animations

BAD output (inventing info):
1. Launch ++Fortnite+Main
2. Select Battle Royale
3. Land at Mega City
4. Pick up Assault Rifle
5. Aim down sights
6. Character enters T-pose
(Steps 3-5 were INVENTED - user never mentioned weapon or location)

Respond ONLY with the steps and results, no explanations.`;

    const userPrompt = `
USER PROVIDED INFORMATION:
Bug Description: ${formData.bugDescription}
What was doing: ${formData.whatWasDoing}
Where: ${formData.whereHappened}
Found CL: ${formData.foundCL || 'Not provided'}
Branch: ${formData.branchFoundIn || 'Not provided'}
Mode: ${formData.experiencesImpacted?.join(', ')}
Platform: ${formData.platforms?.join(', ')}

Generate CONCISE Steps to Reproduce using ONLY the information above:`;

    return await callGroqAPI(systemMessage, userPrompt, 0.4, 1500);
  },

  /**
   * Generate Description section
   */
  async generateDescription(formData) {
    const systemMessage = `You are an expert QA specialist. Generate the Description section for a Jira bug report with ALL these mandatory sections:

REQUIRED SECTIONS:
1. REPRO RATE PLATFORMS: (EXACT format below - use the data provided, fill with 00/00 for platforms not tested)
2. WORKAROUND: (if any, otherwise "None Known")
3. NOTES: (useful observations about the bug)
4. IMPACT: (2-3 sentences explaining user impact)
5. SEARCH TERMS: (relevant keywords not in summary)
6. DEVICE SPECS: (if provided)

CRITICAL: For REPRO RATE PLATFORMS section, use EXACTLY this format with the exact numbers provided:
Total: XX/YY
Platforms:
PS4: XX/XX
PS5: XX/XX
XB1: XX/XX
XSX: XX/XX
Switch: XX/XX
PC: XX/XX
Android: XX/XX
iOS: XX/XX
iPAD: XX/XX
Switch 2: XX/XX

Use 00/00 for platforms not tested. DO NOT skip any platform from the list above.`;

    // Build platform breakdown string
    const platformBreakdown = formData.reproRates ?
      Object.entries(formData.reproRates)
        .map(([platform, rates]) => {
          const occurred = rates.occurred || '00';
          const total = rates.total || '00';
          return `${platform}: ${occurred.padStart(2, '0')}/${total.padStart(2, '0')}`;
        })
        .join('\n')
      : 'No platform data provided';

    const totalReproRate = formData.reproductionCount || '0/0';

    const userPrompt = `
BUG INFORMATION:
Description: ${formData.bugDescription}
What was doing: ${formData.whatWasDoing}
Where: ${formData.whereHappened}
Workaround: ${formData.workaround || 'None'}
Device Specs: ${formData.deviceSpecs || 'Not specified'}
Mode: ${formData.experiencesImpacted?.join(', ')}

REPRO RATE DATA:
Total: ${totalReproRate}
Platform Breakdown:
${platformBreakdown}

Generate the Description section with all mandatory sections using the exact repro rate data above:`;

    return await callGroqAPI(systemMessage, userPrompt, 0.5, 2000);
  },

  /**
   * Suggest Component
   */
  async suggestComponent(formData) {
    const systemMessage = `You are an expert at categorizing Fortnite bugs. Suggest the most appropriate Jira component.

MAIN CATEGORIES:
- BR - Animation - [Cosmetics/Character/Weapon/Vehicle]
- BR - Art - [Environment/UI/VFX/Lighting]
- BR - Gameplay - [Movement/Combat/Interaction/Inventory/Building]
- BR - Network
- BR - UI - [HUD/Menus/Settings]
- BR - Audio - [SFX/Music/Voice]
- BR - Performance
- Juno - [Gameplay/UI/Art]
- Sparks - [Gameplay/UI]
- LEGO - [Gameplay/Building]
- Festival - [Gameplay/Audio]
- Rocket Racing - [Gameplay/Vehicles]
- Creative - [Tools/Islands]
- Lobby - [Frontend/Social]

Respond with ONLY the exact component name (e.g., "BR - Gameplay - Movement"), nothing else.`;

    const userPrompt = `
BUG: ${formData.bugDescription}
LOCATION: ${formData.whereHappened}
ACTION: ${formData.whatWasDoing}
MODE: ${formData.experiencesImpacted?.join(', ')}

What is the most appropriate component?`;

    return await callGroqAPI(systemMessage, userPrompt, 0.3, 50);
  },

  /**
   * Generate all fields at once (parallel processing)
   */
  async generateAllFields(formData) {
    try {
      const [summary, severity, steps, description, component] = await Promise.all([
        this.generateSummary(formData),
        this.generateSeverity(formData),
        this.generateSteps(formData),
        this.generateDescription(formData),
        this.suggestComponent(formData)
      ]);

      return {
        summary: summary.trim(),
        severity: severity.trim(),
        steps: steps.trim(),
        description: description.trim(),
        component: component.trim()
      };
    } catch (error) {
      console.error('Error generating all fields:', error);
      throw error;
    }
  }
};

export default groqService;
