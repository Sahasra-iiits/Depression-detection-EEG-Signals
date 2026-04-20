import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          navigate("/details");
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        navigate("/details");
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return children;
}

export default ProtectedRoute;
