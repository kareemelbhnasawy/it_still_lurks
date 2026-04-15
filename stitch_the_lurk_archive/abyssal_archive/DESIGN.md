# Design System Strategy: Clandestine Intelligence & Ancient Dread

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Forensic Ledger."** 

This is not a social platform or a commercial interface; it is a high-security terminal used by a clandestine operation to document the inexplicable. The design must feel clinical, urgent, and deeply unsettling. We achieve this through "Brutal Editorialism"—a style that combines the rigid, cold structure of a government database with the haunting, high-contrast typography of a vintage horror film.

To break the "template" look, we avoid centered layouts and soft shapes. Instead, we utilize aggressive left-alignment, intentional asymmetry, and "Redaction Blocks" to create a sense of suppressed information. The UI should feel like a digital artifact recovered from a site that no longer exists.

## 2. Color & Surface Architecture
The palette is rooted in total darkness, punctuated by the "Oxidized Red" of emergency alerts and the "Liminal Gray" of forgotten metadata.

### The "No-Line" Rule
While the prompt allows for 1px borders, they must be used sparingly as "tactical dividers" rather than structural containers. Primary sectioning must be achieved through **Surface Shifts**. 
- Use `surface` (#131313) for the base environment.
- Use `surface-container-lowest` (#0E0E0E) for deep-set, inactive regions.
- Use `surface-bright` (#393939) only for fleeting hover states or momentary highlights.

### Redaction & Blocks
Use `on-surface` (#E2E2E2) or `primary-container` (#B22222) as solid "redaction" blocks to hide sensitive data or as high-contrast backgrounds for critical headers. This is our primary design motif—the act of obscuring is as important as the act of revealing.

### Signature Textures
To move beyond a flat digital feel, the system requires a two-layer overlay:
1.  **The Scanline Layer:** A fixed, 2px repeat linear-gradient overlay at 3% opacity to mimic a CRT surveillance monitor.
2.  **The Grain Layer:** A high-frequency film grain jitter (6% opacity) to provide a tactile, "analog-source" quality to the `background` (#000000).

## 3. Typography: The Tension of Type
The typographic soul of this system lies in the violent contrast between the "Ancient" (Newsreader) and the "Technical" (Space Mono).

*   **Display & Headlines (Newsreader):** These should be treated like cinematic titles. Use high-contrast serif scales (`display-lg` to `headline-sm`) with tight letter-spacing. This font represents the "Dread"—the narrative and the horror.
*   **System Metadata & Labels (Space Mono):** Use `label-md` and `label-sm` for all functional UI. This is the "Investigation." It must be set in All-Caps for labels to evoke a thermal printer or a coded teletype.
*   **Body Text (Inter):** Used only for long-form report reading. It provides a clinical, neutral ground between the two extremes.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are forbidden. In an "Elite Vault," there is no ambient light, only the glow of the screen.

*   **The Layering Principle:** Depth is achieved by "stacking" dark values. A `surface-container-high` (#2A2A2A) element does not float; it is "bolted" onto the surface. 
*   **The "Ghost Border" Fallback:** For buttons or input fields, use `outline-variant` (#5A403E) at 40% opacity. It should look like a faint scratch on a dark lens, not a decorative border.
*   **Interventionist Red:** Use `primary-container` (#B22222) for elements that require immediate cognitive load. When this red appears, it should feel like a physical alarm.

## 5. Components

### Redaction Buttons
*   **Primary:** A solid `primary-container` (#B22222) block with `on-primary` (#690007) text in Space Mono. 0px corners. No gradients.
*   **Secondary:** A solid `on-surface` (#E2E2E2) block with `background` (#000000) text. This feels like a label stuck onto a file.

### Investigative Input Fields
*   **Style:** No background fill. Only a 1px bottom border using `liminal-gray` (#4A4A4A). 
*   **State:** When active, the border turns `primary` (#FFB4AC) and a 10% grain overlay fills the field.

### Evidence Cards
*   **Constraint:** Forbid divider lines. Separate content using the `surface-container` tiers. 
*   **Motif:** A small "Redaction Block" should occupy the top-right corner of every card, containing the timestamp in `label-sm`.

### Data Grids (The Ledger)
*   Rows should alternate between `surface` and `surface-container-low`. 
*   On hover, a row should trigger a `surface-bright` glow with a 1px `oxidized-red` left-edge accent.

### Tactical "Scan" Progress Bar
*   A flat 2px bar using `primary-container`. No rounded ends. A secondary "glitch" animation should occasionally offset the bar by 2px to maintain the "unsettling" tone.

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Align metadata to the far right while the headline is far left. Create "uncomfortable" white space.
*   **Use Mono for Numbers:** All coordinates, dates, and IDs must use Space Mono.
*   **Lean into Sharpness:** Every corner must be 0px. The UI should look like it could cut.

### Don't:
*   **Don't use Rounded Corners:** Ever. It breaks the "Clinical/Tactical" immersion.
*   **Don't use Soft Shadows:** They feel "consumer-grade." If you need separation, use a hard 1px offset stroke in `secondary-container`.
*   **Don't use "Friendly" Copy:** Buttons should say "EXECUTE," "QUERY," or "PURGE," not "Submit" or "Okay."