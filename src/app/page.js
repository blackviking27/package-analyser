import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen" >
      <section>
        <section className="text-2xl mb-4" >Package analyser</section>
        <section>
          <Button  >
            <Link href='/analyse'>
              Analyse your packge json
            </Link>
          </Button>
        </section>
      </section>
    </main>
  );
}
