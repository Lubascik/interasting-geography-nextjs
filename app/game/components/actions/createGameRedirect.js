"use server";

import { redirect } from "next/navigation";

export async function createGameRedirect(gameID, lang) {
    redirect(`/game/${lang ? lang : "en"}/${gameID}`);
}