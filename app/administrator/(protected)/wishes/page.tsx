import { Trash2 } from "lucide-react";
import { getAllWishes } from "@/lib/services/wishes";
import { deleteWishAction } from "./actions";

export default async function WishesPage() {
  const wishes = await getAllWishes();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Wishes</h1>
        <p className="text-sm text-gray-500">Messages guests have left on the wedding wishes wall</p>
      </div>

      {wishes.length === 0 ? (
        <p className="text-sm text-gray-500">No wishes yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {wishes.map((wish) => (
            <li
              key={wish.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-900">{wish.name}</p>
                <p className="mt-1 text-sm text-gray-600">{wish.message}</p>
              </div>
              <form action={deleteWishAction}>
                <input type="hidden" name="id" value={wish.id} />
                <button
                  type="submit"
                  aria-label="Delete wish"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
