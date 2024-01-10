"use server";
import GameManager from "./GameManager";
const _GameManager = new GameManager();
export const g_GameManager = _GameManager;

import APIAuth from "./APIAuth";
const _APIAuth = new APIAuth();
export const g_APIAuth = _APIAuth;
