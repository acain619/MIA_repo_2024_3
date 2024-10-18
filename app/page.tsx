'use client'

import Link from "next/link";

export default function Home() {

  return <div >
    <div className="flex flex-col gap-2">
      <p>
        Please refer to the directions in the prompt.
      </p>
      <div>
        Additional resources include:
        <ul className="list-disc ml-4">
          <li>
            <Link className="text-sm underline" href="https://nextjs.org/docs/app" target="_blank">NextJS documentation</Link>
          </li>
          <li>
            <Link className="text-sm underline" href="https://tailwindcss.com/docs/utility-first" target="_blank">TailwindCSS documentation</Link>
          </li>
          <li>
            <Link className="text-sm underline" href="https://ui.shadcn.com/docs/components/table" target="_blank">shadcn/ui documentation</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-4">
      <Link href="/pitcher/676974" className="underline ">
        Link to a pitcher&apos;s page
      </Link>
    </div>
  </div>
}
