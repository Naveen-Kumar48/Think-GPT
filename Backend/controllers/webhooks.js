import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/Usermodel.js";

export const stripeWebhooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECREAT_KEY);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECREAT
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`WebHook Error:${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { transactionId, appId } = session.metadata;

        if (appId === "quickgpt") {
          const transaction = await Transaction.findOne({
            _id: transactionId,
            isPaid: false,
          });

          if (transaction) {
            //*update the credits in the user account
            await User.updateOne(
              { _id: transaction.userId },
              { $inc: { credits: transaction.credits } },
            );
            //* update the payment status
            transaction.isPaid = true;
            await transaction.save();
          }
        } else {
          console.log("Ignored event: Invalid App ID");
        }
        break;
      }
      case "payment_intent.succeeded": {
        // Optional: handle if needed, but checkout.session.completed is preferred for checkout flows
        break;
      }
      default:
        console.log("Unhandled event type", event.type);
        break;
    }
    res.json({
      received: true,
    });
  } catch (error) {
    console.error("Webhook processing error: ", error);
    res.status(500).send("Internal Server Error");
  }
};
