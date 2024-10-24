import { Dashboard } from "./components/Dashboard";

export default async function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-16 h-full">
      <Dashboard/>
    </div>
  );
}
