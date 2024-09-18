import React, { createContext, useContext, useState, ReactNode } from 'react';
interface Room {
  address: string;
  depositInfo: any;
}
interface RoomContextType {
  rooms: Room[];
  updateRoom: (address: string, depositInfo: any) => void;
  getRoomByAddress: (address: string) => Room | undefined;
  addRoom: (room: Room) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const updateRoom = (address: string, depositInfo: any) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.address === address ? { ...room, depositInfo } : room,
      ),
    );
  };

  const getRoomByAddress = (address: string): Room | undefined => {
    return rooms.find((room) => room.address === address);
  };

  const addRoom = (room: Room) => {
    setRooms((prevRooms) => [...prevRooms, room]);
  };

  return (
    <RoomContext.Provider
      value={{ rooms, updateRoom, getRoomByAddress, addRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};
