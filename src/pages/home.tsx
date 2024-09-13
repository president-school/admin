import { UsersRound } from 'lucide-react';

export const Home = () => {
  return (
    <main className="w-full p-10">
      <h1 className="font-semibold text-[36px] text-[#303972] mb-11">Home</h1>
      <section className="bg-white rounded-2xl p-11 flex gap-10">
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>O'quvchilar</p>
            <h3 className="font-bold text-xl">1000</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>O'qituvchilar</p>
            <h3 className="font-bold text-xl">700</h3>
          </div>
        </div>
      </section>
    </main>
  );
};
