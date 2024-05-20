import React, { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import UserDetails from "../../components/UserDetails";
import { AuthRouteNames } from "../../router/route-names";
import { useAuth } from "../../hooks/authContext";

const UserDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const auth = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    await auth.logout();
    navigation.navigate(AuthRouteNames.LOGIN);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const data = await auth.userDetails();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [auth]);

  return (
    <UserDetails userData={userData} loading={loading} logout={handleLogout} />
  );
};

export default UserDetailsScreen;
