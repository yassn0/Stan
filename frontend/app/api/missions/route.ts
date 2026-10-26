import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

// Signing happens server-side only: PROD_PRIVATE_KEY must never be exposed with a NEXT_PUBLIC_ prefix
const ARTIST_ABI = [
  "function completeFanMission(uint256 missionIndex, address fan) public",
  "function registerFanOnMission(uint256 missionIndex, address fan) public",
  "function getStatuFanOnMission(uint256 missionIndex, address fan) public view returns(uint8)",
]

export async function POST(request: Request) {
  const { action, missionIndex } = await request.json()

  if (!['register', 'complete'].includes(action) || !Number.isInteger(missionIndex) || missionIndex < 0) {
    return NextResponse.json({ error: 'Invalid action or missionIndex' }, { status: 400 })
  }

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ARTIST_CONTRACT_ADDRESS?.replace(';', '')
  const FAN_ADDRESS = process.env.NEXT_PUBLIC_PROD_PUBLIC_KEY?.replace(';', '')
  const PRIVATE_KEY = process.env.PROD_PRIVATE_KEY?.replace(';', '')

  if (!RPC_URL || !CONTRACT_ADDRESS || !FAN_ADDRESS || !PRIVATE_KEY) {
    return NextResponse.json({ error: 'Missing server configuration' }, { status: 500 })
  }

  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ARTIST_ABI, wallet)

    const tx = action === 'register'
      ? await contract.registerFanOnMission(missionIndex, FAN_ADDRESS)
      : await contract.completeFanMission(missionIndex, FAN_ADDRESS)
    await tx.wait()

    const fanStatus = await contract.getStatuFanOnMission(missionIndex, FAN_ADDRESS)
    return NextResponse.json({ txHash: tx.hash, fanStatus: fanStatus.toString() })
  } catch (error: any) {
    return NextResponse.json({ error: error.shortMessage || error.message }, { status: 500 })
  }
}
