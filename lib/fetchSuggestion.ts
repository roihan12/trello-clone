import formatTodosForAi from "./formatTodosForAi";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAi(board);

  console.log("FORMATED TODOS TO SEND", todos);

  const res = await fetch("http://localhost:3000/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  const GPTdata = await res.json();
  const { content } = GPTdata;
  return content;
};

export default fetchSuggestion;
