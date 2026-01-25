import Stripe from "stripe"

export const stripeWebhooks=async(req,res)=>{
    const stripe=new Stripe(process.env.STRIPE_SECREAT_KEY)
    const sig=Request.headers
}
