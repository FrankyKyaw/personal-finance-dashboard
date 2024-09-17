import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

interface PlaidLinkButtonProps {
  onSuccess: (accessToken: string) => void;
  accessToken?: string | null;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ onSuccess, accessToken: existingAccessToken }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const fetchLinkToken = useCallback(async () => {
    if (!session?.user?.id) {
      console.error("User ID is not available");
      return;
    }

    const response = await fetch("/api/plaid/createLinkToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId: session?.user?.id,
        accessToken: existingAccessToken, }),
    });

    const data = await response.json();
    console.log("response", data.link_token);
    setLinkToken(data.link_token);
  }, [session?.user?.id, existingAccessToken]);

  useEffect(() => {
    if (linkToken === null) {
      fetchLinkToken();
    }
  }, [fetchLinkToken]);

  const handleOnSuccess = async (public_token: string) => {
    try {
      const response = await fetch("/api/plaid/exchangePublicToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token }),
      });
      const exchangeData = await response.json();

      const saveResponse = await fetch("/api/plaid/saveAccessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          accessToken: exchangeData.access_token,
          itemId: exchangeData.item_id,
        })
      });
      const saveData = await saveResponse.json();
      if ( saveData.success) {
        console.log("Access token saved successfully");
        onSuccess(exchangeData.access_token);
      } else {
        console.error("Error saving access token");
      }
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  const config = {
    token: linkToken,
    onSuccess: handleOnSuccess,
  };
  const { open, ready } = usePlaidLink(config);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  return (
    <button
      className="border rounded-xl border-black p-2 hover:bg-gray-200 shadow-sm"
      onClick={() => open()}
      disabled={!ready}
    >
      {existingAccessToken ? "Update Account Connection" : "Connect a bank account"}
    </button>
  );
};

export default PlaidLinkButton;
