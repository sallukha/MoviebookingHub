 import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  CreditCard,
  Wallet,
  Building2,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function PaymentPage() {
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const [processing, setProcessing] = useState(false);

  // 🔹 Load booking data
  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (!data) {
      navigate("/home");
      return;
    }
    setBookingData(JSON.parse(data));
  }, []);

  if (!bookingData) {
    return <div className="text-white p-10">Loading...</div>;
  }

  const total = bookingData.totalPrice + bookingData.seats.length * 20;

  // 🔥 REAL PAYMENT HANDLER
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error("Please fill all card details");
        return;
      }
    }

    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter UPI ID");
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch(
        "http://54.252.215.51:9000/api/v1/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethod,
            amount: total,
            bookingData,
            cardDetails:
              paymentMethod === "card"
                ? {
                    cardNumber,
                    cardName,
                    expiryDate,
                    cvv,
                  }
                : null,
            upiId: paymentMethod === "upi" ? upiId : null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      toast.success("Payment Successful!");
      localStorage.removeItem("bookingData");
      navigate("/dashboard");

    } catch (error: any) {
      toast.error(error.message || "Payment error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">

      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 text-white hover:bg-white/20"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Button>

      <h1 className="text-white text-3xl mb-6">Complete Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* PAYMENT FORM */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 border-white/20 p-6 mb-6">
            <h2 className="text-white text-2xl mb-6">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-lg border-2 ${
                  paymentMethod === "card"
                    ? "border-purple-600 bg-purple-600/20"
                    : "border-white/20"
                }`}
              >
                <CreditCard className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white text-sm">Card</p>
              </button>

              <button
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-lg border-2 ${
                  paymentMethod === "upi"
                    ? "border-purple-600 bg-purple-600/20"
                    : "border-white/20"
                }`}
              >
                <Wallet className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white text-sm">UPI</p>
              </button>

              <button
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-4 rounded-lg border-2 ${
                  paymentMethod === "netbanking"
                    ? "border-purple-600 bg-purple-600/20"
                    : "border-white/20"
                }`}
              >
                <Building2 className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white text-sm">Net Banking</p>
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">

              {paymentMethod === "card" && (
                <>
                  <div>
                    <Label className="text-white">Card Number</Label>
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={16}
                      className="bg-white/10 border-white/20 text-white mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Cardholder Name</Label>
                    <Input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="CVV"
                      maxLength={3}
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </>
              )}

              {paymentMethod === "upi" && (
                <Input
                  placeholder="username@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              )}

              {paymentMethod === "netbanking" && (
                <select className="w-full bg-white/10 border border-white/20 text-white p-2 rounded">
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>AXIS</option>
                </select>
              )}

              <Button disabled={processing} className="w-full bg-purple-600">
                {processing ? "Processing..." : `Pay ₹${total}`}
              </Button>

            </form>
          </Card>
        </div>

        {/* ORDER SUMMARY */}
        <div>
          <Card className="bg-white/10 border-white/20 p-6 sticky top-10">
            <h2 className="text-white text-2xl mb-6">Order Summary</h2>

            <p className="text-white">{bookingData.movie.title}</p>
            <p className="text-gray-300">{bookingData.date}</p>
            <p className="text-gray-300">{bookingData.showtime}</p>

            <div className="mt-4 flex gap-2 flex-wrap">
              {bookingData.seats.map((s: any) => (
                <Badge key={s.id} className="bg-purple-600">
                  {s.id}
                </Badge>
              ))}
            </div>

            <div className="border-t border-white/20 mt-4 pt-4">
              <div className="flex justify-between text-white">
                <span>Tickets</span>
                <span>₹{bookingData.totalPrice}</span>
              </div>

              <div className="flex justify-between text-white mt-2">
                <span>Convenience Fee</span>
                <span>₹{bookingData.seats.length * 20}</span>
              </div>

              <div className="flex justify-between text-purple-400 text-xl mt-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

          </Card>
        </div>

      </div>
    </div>
  );
}
