import { serve } from 'bun';
import { readFileSync } from "fs";

const about_html = readFileSync("./about.html", "utf-8");
const products = [
  { id: 1, name: "Used Laptop", price: 300 },
  { id: 2, name: "Second-hand Bicycle", price: 50 },
];

Bun.serve({
  port: 8050,
  fetch(req) {
    const url = new URL(req.url);

  
    const logData = `[${new Date().toISOString()}] ${req.method} ${url.pathname}\n`;


    Bun.write("./log.txt", logData, { append: true });
    if (url.pathname === "/") {
      return new Response("Welcome to the BarterX");
    }

    if (url.pathname === "/products") {
      return new Response("Here are the products up for Sale in BarterX");
    }

    
    if (url.pathname === "/login") {
      return new Response("Login to the BarterX");
    }

    
    if (url.pathname === "/signup") {
      return new Response("Sign up to the BarterX");
    }

  
    if (url.pathname === "/profile") {
      return new Response("Trader Profile");
    }

 
    if (url.pathname === "/cart") {
      return new Response("Your Shopping Cart is here");
    }

  
    if (url.pathname === "/checkout") {
      return new Response("Let's start shipping");
    }


    if (url.pathname === "/orders") {
      return new Response("Your Orders are here");
    }

   
    if (url.pathname === "/categories") {
      return new Response("Browse Categories");
    }

   
    if (url.pathname === "/chat") {
      return new Response("Your Chat with fellow Traders");
    }

    if (url.pathname === "/contact") {
      return new Response("Contact Us at");
    }

    if (url.pathname === "/about") {
      return new Response(about_html,{status: 200,headers: {"Content-Type": "text/html",},})
    }

    if (url.pathname === "/api/products") {
      return new Response(JSON.stringify(products), {
        headers: { "Content-Type": "application/json" },
      });
    }

   
    if (url.pathname === "/logo.png") {
      try {
        const filePath = "./public/logo.png"; 
        const file = Bun.file(filePath); 
        return new Response(file, {
          headers: { "Content-Type": "image/png" }, 
        });
      } catch (error) {
        return new Response("File not found", { status: 404 });
      }
    }
    
  
    if (url.pathname === "/styles.css") {
      try {
        const filePath = "./public/styles.css";
        const file = Bun.file(filePath);
        return new Response(file, {
          headers: { "Content-Type": "text/css" },
        });
      } catch (error) {
        return new Response("File not found", { status: 404 });
      }
    }

    return new Response(
      JSON.stringify({ error: "Page not found", statusCode: 404 }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  },
});

console.log("Server initiated on port 8050...");
