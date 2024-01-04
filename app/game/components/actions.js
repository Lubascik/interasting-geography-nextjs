"use server";

import { redirect } from "next/navigation";

export async function createGameRedirect(gameID) {
  redirect(`/game/en/${gameID}`);
}
