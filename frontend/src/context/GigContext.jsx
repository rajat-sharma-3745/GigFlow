import { createContext, useState } from "react";
import { gigAPI } from "../api/gig.api";

export const GigContext = createContext();

export const GigProvider = ({ children }) => {
  const [gigs, setGigs] = useState([]);
  const [userGigs, setUserGigs] = useState([]);
  const [loading, setLoading] = useState({
    all: false,
    user: false,
    create: false,
  });

  const fetchGigs = async (search = "") => {
    setLoading({ ...loading, all: true });
    try {
      const data = await gigAPI.getAllGigs(search);
      setGigs(data.data.gigs);
    } catch (error) {
      console.error("Failed to fetch gigs:", error);
      throw error;
    } finally {
      setLoading({ ...loading, all: false });
    }
  };

  const fetchUserGigs = async () => {
    setLoading({ ...loading, user: true });
    try {
      const data = await gigAPI.getUserGigs();
      setUserGigs(data.data.gigs);
    } catch (error) {
      console.error("Failed to fetch user gigs:", error);
      throw error;
    } finally {
      setLoading({ ...loading, user: false });
    }
  };

  const createGig = async (gigData) => {
    setLoading({ ...loading, create: true });

    try {
      const data = await gigAPI.createGig(gigData);
      setUserGigs((prev) => [data.data.gig, ...prev]);
      return data;
    } catch (error) {
      console.error("Failed to create gig:", error);
      throw error;
    } finally {
      setLoading({ ...loading, create: false });
    }
  };

  return (
    <GigContext.Provider
      value={{
        gigs,
        userGigs,
        loading,
        fetchGigs,
        fetchUserGigs,
        createGig,
      }}
    >
      {children}
    </GigContext.Provider>
  );
};
