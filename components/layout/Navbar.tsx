import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>Eventour</p>
        </Link>
        <ul>
          <Link href="/">Home</Link>
          <Link href="#events">Events</Link>
          <Link href="#create">Create</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
