import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/accounts">
            Accounts
          </Link>
        </li>
      </ul>
    </nav>
  );
}