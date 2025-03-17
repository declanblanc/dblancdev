import me from "../assets/me.png";
import { Divider } from "@mantine/core";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center flex-col">
        <img
          src={me}
          className="size-60 m-2 rounded-full logo"
          alt="Vite logo"
        />
        <h1 className="text-[#79B813] text-center text-6xl font-bold">
          Declan Blanchard
        </h1>
        <p className="text-[#F92572] text-xl p-3 text-center">
          Fullstack Developer
        </p>
      </div>

      <div
        id="about-me"
        className="about w-[50%] flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl text-center font-extrabold">Hello, World!</h2>
        <strong>Thanks for checking out my website!</strong>
        <br />
        <p className="text-center">
          <br />
          My name is <strong>Declan Blanchard</strong>, a
          <strong> Computer Science</strong> student at NJIT 🏫 I’ve immersed
          myself in coding 💻, community engagement, and leadership roles,
          blending technical expertise with a human-centered approach.
        </p>
        <p className="text-center">
          When I’m not coding, you can find me in the gym 🏋️‍♂️, playing video
          games 🎮, connecting with friends 👬🏼, or spending quality time with my
          girlfriend and our two cats 🐾❤️. To find out more about what I've
          been up to, check out my Blog Page!
        </p>
        <br />
        <p id="details" className="text-center">
          You can view the GitHub repository for this project{" "}
          <a
            className="underline text-[#E6DB74]"
            href="https://github.com/declanblanc/DeclansDigitalDevelopment"
          >
            here
          </a>
          . <br />
          <br />
          If you have any questions or you're interested in working together,
          feel free to{" "}
          <a
            className="underline text-[#E6DB74]"
            href="mailto:declanblanc@gmail.com"
          >
            email me
          </a>
          , message me on{" "}
          <a
            className="underline text-[#E6DB74]"
            href="https://www.linkedin.com/in/declanblanc/"
          >
            LinkedIn
          </a>
          , or contact me via Discord @declanblanc
        </p>
      </div>
    </div>
  );
}
export default Home;
