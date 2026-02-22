export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const { type, value } = await request.json();
      let reversed;

      if (type === "string") {
        reversed = value.split("").reverse().join("");
      } else if (type === "array") {
        reversed = [...value].reverse();
      } else if (type === "words") {
        reversed = value.split(" ").reverse().join(" ");
      } else if (type === "number") {
        reversed = parseInt(value.toString().split("").reverse().join(""), 10);
      } else {
        return new Response("Invalid type", { status: 400 });
      }

      const responseBody = {
        reversed: reversed,
        email: "24f2008474@ds.study.iitm.ac.in",
      };

      return new Response(JSON.stringify(responseBody), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (e) {
      return new Response("Error processing request: " + e.message, { status: 500 });
    }
  },
};
