import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // todos in the body of the POST req

  const { todos } = await request.json();
  console.log(todos);

  //Communication with openAI GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user always as Mr.Roihan and say welcome to trello clone app! Limit the response to 300 characters",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done,then congratulate if there is a todo that has been completed and if there is one that has not been completed give words of encouragement. then tell the use to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  console.log("DATA IS:", response.choices[0]);
  console.log(response.choices[0].message);

  return NextResponse.json(response.choices[0].message);
}
