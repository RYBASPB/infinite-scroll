import { DIST_URL } from '../../../shared/constants/api'
import { NpmObjects } from '../model/interfaces/npm-package'

interface NpmResponse {
  time: string
  total: number
  objects: NpmObjects
}

export async function fetchPackages() {
  try {
    const response = await fetch(DIST_URL, {
      method: 'GET',
    })
    const { time, total, objects } = await response.json()
    console.log(JSON.stringify(objects[0]))
  } catch (error) {
    // TODO error handle
    console.error(error);
  }
}
