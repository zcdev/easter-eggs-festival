# Dev Note: Handling the `undefined` Case in TypeScript Arrays ⁉️ 🤔

## My code:

```
// Type alias
type EggItem = {
  id: number;
  image: string;
  value: number;
};

// Get each egg value
function generateEggs(count: number): EggItem[] {
  const eggsValues: number[] = [];
  while (eggsValues.length < count) {
    const eggValue: number = getRandomInt(1, 12);
    if (!eggsValues.includes(eggValue)) eggsValues.push(eggValue);
  }

	// Return a new array with updated egg items.
    return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    image: `/assets/images/egg-${i + 1}`,
    value: eggsValues[i],
  }));
}

// Generate random value for each egg and store in state
const [eggs] = useState<EggItem[]>(() => generateEggs(4));
```

The **TypeScript language service** (a.k.a. tsserver) that is built into VSCode will mark the `return` keyword by a red squiggly line when the variable is strictly typed as `number` yet has the potential to be `undefined`.

## VSCode’s strict type-checking throws this error:

```
Type '{ id: number; image: string; value: number | undefined; }[]' is not assignable to type 'EggItem[]'.
Type '{ id: number; image: string; value: number | undefined; }' is not assignable to type 'EggItem'.
Types of property 'value' are incompatible.
Type 'number | undefined' is not assignable to type 'number'.
Type 'undefined' is not assignable to type 'number'.ts(2322)
```

Because `eggsValues` starts as an empty array, accessing `eggsValues[i]` can yield `undefined`, so TypeScript infers `number | undefined`.

### There are a few possible ways to resolve this issue, you can:

1. Use a union type and handle `undefined`.

```
type EggItem = {
  id: number;
  image: string;
  value: number | undefined;
};
```

2. Provide a default value by using the **Nullish Coalescing Operator** `??` to default it to `0` if it is `undefined` or `null`.

```
value: eggsValues[i] ?? 0;
```

3. Type guard it conditionally to check if `value` is not undefined or set it to `0`.

```
value: eggsValues[i] !== undefined ? eggsValues[i] : 0;
```

4. Use the **Non-null Assertion Operator** `!` if you are certain that `value` is not `undefined`.

```
value: eggsValues[i]!;
```

5. Or, simply use `.map()` to return a new array for the `eggsValues` and keep `value` preserved. This is the cleanest solution since every value is guaranteed as a `number`:

```
 return eggsValues.map((value, i) => ({
    id: i + 1,
    image: `/assets/images/egg-${i + 1}`,
    value,
  }));
```

So, here again, the type alias was initialized like this:

```
type EggItem = {
  id: number;
  image: string;
  value: number; // The type is then guaranteed here!
};
```

**Valuable lesson learned:** Guard your types, and define your code thoughtfully. 😏
