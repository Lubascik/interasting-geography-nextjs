"use server";

import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export async function createGameRedirect(gameID) {
  redirect(`/game/en/${gameID}`);
}

export async function setPlayerCookie(playerData) {
  const options = {expires: Date.now() + 1000 * 60 * 60 * 24 * 365}
  cookies().set('player-uuid', playerData.uuid, options)
  cookies().set('player-name', playerData.name, options)
}