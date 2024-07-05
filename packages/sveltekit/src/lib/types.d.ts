import type { SvelteKitAuthConfig as BaseSvelteKitAuthConfig } from '@auth/sveltekit'
import type { PagesOptions as BasePagesOptions } from '@auth/core/types'
import type { Session as BaseSession } from "@auth/core/types"

export interface PagesOptions extends BasePagesOptions {
	checkout: Partial<{
		success: string
		cancel: string
	}>

		portalReturn: string
}

export interface SvelteKitAuthConfig extends BaseSvelteKitAuthConfig {
	pages?: Partial<PagesOptions>
}

declare global {
	namespace App {
		interface Subscription {
			readonly id: string
			readonly status: 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused'
			readonly plan: string
			readonly priceId: string
		}

		interface Session extends BaseSession {
			readonly customerId: string | null
			readonly purchases: string[]
			readonly subscription: Subscription | null
		}

		interface Locals {
			auth(): Promise<Session | null>
				getSession(): Promise<Session | null>
		}

		interface PageData {
			readonly session?: Session | null
		}
	}
}
