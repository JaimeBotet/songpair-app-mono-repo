import { normalize, schema } from "normalizr";

const user = new schema.Entity('users');

const song = new schema.Entity('song',{
  publisher: user
});

export function normalizeSong(songJSON) {
  return normalize(songJSON, [song]);
}
