import { Form, useLoaderData, useActionData } from "@remix-run/react";

// Server-side loader function
export async function loader() {
  return { welcomeMessage: "Welcome to the Cloudflare Pages Remix App!" };
}

// Server-side action function
export async function action({ request }) {
  const formData = await request.formData();
  const text = formData.get("text");
  const reversed = text.split("").reverse().join("");
  return { reversed };
}

// UI component
export default function Index() {
  const { welcomeMessage } = useLoaderData();
  const actionData = useActionData();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>{welcomeMessage}</h1>
      <Form method="post">
        <input type="text" name="text" placeholder="Enter text" />
        <button type="submit">Reverse</button>
      </Form>
      {actionData?.reversed && (
        <p>
          <strong>Reversed Text:</strong> {actionData.reversed}
        </p>
      )}
    </div>
  );
}