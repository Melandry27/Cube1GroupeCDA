import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as UserService from "../app/services/usersService";
import { useAuth } from "./AuthContext";

interface Member {
  _id: string;
  name: string;
  email: string;
}

interface DecodedToken {
  _id: string;
  name: string;
  email: string;
  role: string;
  adress: string;
  phone: string;
}

interface MembersContextProps {
  members: Member[];
  addMember: (member: Member) => void;
  removeMember: (id: string) => void;
  selectMember: (id: string) => void;
  selectedMember: Member | null;
}

const MembersContext = createContext<MembersContextProps | undefined>(
  undefined
);

export const MembersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await UserService.fetchMembers();

        if (!membersData) {
          throw new Error("Failed to fetch members data");
        }
        const decodedMembers = membersData.members.map((token: string) =>
          jwtDecode<DecodedToken>(token)
        );

        const filteredDecodedMembers = decodedMembers.filter(
          (member: any) => member._id !== user?._id
        );

        setMembers(filteredDecodedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const addMember = (member: Member) => {
    setMembers((prevMembers) => [...prevMembers, member]);
  };

  const removeMember = (id: string) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== id)
    );
  };

  const selectMember = (id: string) => {
    const member = members.find((member) => member._id === id);
    if (member) {
      setSelectedMember(member);
    } else {
      console.error("Member not found:", id);
    }
  };

  return (
    <MembersContext.Provider
      value={{ members, addMember, removeMember, selectMember, selectedMember }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export const useMembers = (): MembersContextProps => {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used within a MembersProvider");
  }
  return context;
};
