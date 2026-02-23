# Change Calculator Wireframe

## Goal
Define the first-pass UI wireframe and implementation plan for the Change Calculator app before coding.

## Page Wireframe (ASCII)

```text
+---------------------------------------------------------------+
| Header                                                        |
| "Change Calculator"                                           |
| Tagline: "Enter sale amount and cash received to get change." |
+---------------------------------------------------------------+
| Main Content Row                                              |
|                                                               |
| +---------------------------+  +----------------------------+ |
| | Input Panel               |  | Results Area               | |
| |                           |  |                            | |
| | Amount Due      [_____]   |  | Outcome Alert             | |
| | Amount Received [_____]   |  | [success/danger message]  | |
| |                           |  |                            | |
| | [ Calculate ]             |  | Denomination Grid          | |
| |                           |  | +------+------+------+---+ | |
| |                           |  | | 20s | 10s |  5s | 1s| | |
| |                           |  | +------+------+------+---+ | |
| |                           |  | | 25c | 10c |  5c | 1c| | |
| |                           |  | +------+------+------+---+ | |
| +---------------------------+  +----------------------------+ |
+---------------------------------------------------------------+
```

## Component Plan

### Chosen Approach
`A) Single-component implementation (App only)` because it is the fastest path and keeps state/test-id wiring simple for early test-driven constraints.

### Component Tree

```text
App
```

## State Ownership Plan

### Where State Lives
All UI state lives in `App`.

### State Variables (explicit)
- `amountDue`
- `amountReceived`
- `changeDue`
- `twenties`
- `tens`
- `fives`
- `ones`
- `quarters`
- `dimes`
- `nickels`
- `pennies`
- `alertVariant` (`success` or `danger`)

### Event / Render Flow
- User types into `amountDue` and `amountReceived` inputs -> update `App` state.
- User clicks `Calculate` button -> `App` computes change and denomination counts.
- `App` updates alert state + denomination state -> results area re-renders.

## Testing Hooks Mapping (`data-testid`)

### Inputs / Action
- `amountDue`: Amount Due input (left input panel)
- `amountReceived`: Amount Received input (left input panel)
- `calculate`: Calculate button (left input panel)

### Denomination Results (right results area -> denomination grid)
- `twenties`: twenties count display
- `tens`: tens count display
- `fives`: fives count display
- `ones`: ones count display
- `quarters`: quarters count display
- `dimes`: dimes count display
- `nickels`: nickels count display
- `pennies`: pennies count display

## Implementation Notes (for next step)
- Header/tagline render at top of page.
- Main content uses a 2-column layout (form left, results right).
- Outcome alert appears above denomination grid and uses `alertVariant` to style success vs danger.
- Denomination grid always renders predictable test targets, even when counts are zero.
