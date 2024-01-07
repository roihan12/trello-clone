import { Query, databases } from "@/appwrite";

export const getTodosGroupedByColumn = async (email: string) => {
  try {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [email])]
    );

    const firstDocument = data.documents[0];

    if (!firstDocument) {
      throw new Error("No document found for the given email.");
    }

    const todos = firstDocument.todos;

    if (!todos) {
      throw new Error("No 'todos' property found in the document.");
    }
  

    console.log("todos", todos);

    const columns = todos?.reduce(
      (acc: Map<TypedColumn, Column>, todo: Todo) => {
        if (!acc.get(todo.status)) {
          acc.set(todo.status, {
            id: todo.status,
            todos: [],
          });
        }
        acc.get(todo.status)!.todos.push({
          $id: todo.$id,
          $createdAt: todo.$createdAt,
          title: todo.title,
          status: todo.status,
          //   Get the image if it exists on the todo
          ...(todo.image && { image: JSON.parse(todo.image!)}),
        });

        return acc;
      },
      new Map<TypedColumn, Column>()
    );

    //   console.log(columns);

    // if columns doesnt have inprogress, todo, and done, add them with empty todos

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

    for (const columnType of columnTypes) {
      if (!columns.get(columnType)) {
        columns.set(columnType, {
          id: columnType,
          todos: [],
        });
      }
    }

    //   console.log(columns);

    const sortedColumns = new Map<TypedColumn, Column>(
      (Array.from(columns.entries()) as [TypedColumn, Column][]).sort(
        (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
      )
    );

    const board: Board = {
      columns: sortedColumns,
    };

    //   console.log(board);
    return board;
  } catch (error) {
    console.log(error);
    // Handle the error as needed, e.g., return an error state or rethrow the error
    throw error;
  }
};
