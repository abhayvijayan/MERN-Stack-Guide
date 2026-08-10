# 08 - Todo List UI

In this project, you will build a classic Todo application using React. This is a purely Frontend application (the data will be lost when you refresh the page). In Level 4, we will connect it to our database!

## Learning Objectives
- Using `useState` with Arrays and Objects.
- Immutability in React (updating state correctly).
- Rendering lists using `Array.map()`.
- Two-way data binding (Controlled Components via `value` and `onChange`).
- Conditional Rendering.

## Setup Instructions

1. Navigate to this folder: `cd 08-Todo-UI`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Code Explanation

- **Array State:** Our `todos` state is an array of objects.
- **Controlled Inputs:** Notice the `<input>` element. We tie its `value` to the `inputValue` state, and whenever the user types (`onChange`), we update that state. This means React is always in complete control of what the input displays.
- **Rendering Lists:** We use `{todos.map(todo => ...)}` to loop through our array and return HTML for every single item.
- **The `key` Prop:** Notice we added `key={todo.id}` to the `<li>`. React requires a unique key for every item in a mapped list so it can efficiently keep track of which items are added, changed, or removed.
- **Immutability:** When adding a todo, we DO NOT do `todos.push()`. Instead we do `setTodos([...todos, newTodo])`. We create a brand new array, copy the old items into it, add the new item, and give it to React.

## 📝 Assignments

1. **Clear All Button:** Add a button below the list that says "Clear All". When clicked, it should completely empty the list.
2. **Task Counters:** Add text at the top of the app that says "X tasks left", where X is the number of tasks that are NOT completed.
3. **Filter (Bonus):** Add three buttons: "All", "Active", "Completed". Create a new state variable called `filter`. Depending on which button is clicked, filter the `todos` array before you `map` over it to only show the relevant tasks.
