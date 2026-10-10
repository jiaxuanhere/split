
import { useState } from "react";
import TripNameForm from "./components/TripNameForm";
import AddFriends from "./components/AddFriends";
import "./App.css";

type Trip = {
  name: string;
  friends: string[];
};

type Screen = "trip-name" | "friends" | "expenses";

function App() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [screen, setScreen] = useState<Screen>("trip-name");

  function handleCreateTrip(name: string) {
    setTrip({
      name,
      friends: ["You"],
    });

    setScreen("friends");
  }

  function handleAddFriend(name: string) {
    setTrip((currentTrip) => {
      if (!currentTrip) return currentTrip;

      return {
        ...currentTrip,
        friends: [...currentTrip.friends, name],
      };
    });
  }

  function handleRemoveFriend(name: string) {
    setTrip((currentTrip) => {
      if (!currentTrip) return currentTrip;

      return {
        ...currentTrip,
        friends: currentTrip.friends.filter(
          (friend) => friend !== name
        ),
      };
    });
  }

  return (
    <main className="app">
      {screen === "trip-name" && (
        <section className="welcome-card">
          <p className="eyebrow">YOUR NEXT ADVENTURE</p>

          <h1>TripSplit</h1>

          <p className="subtitle">
            Plan your trip. Split your expenses.
          </p>

          <TripNameForm onCreateTrip={handleCreateTrip} />
        </section>
      )}

      {screen === "friends" && trip && (
        <AddFriends
          tripName={trip.name}
          friends={trip.friends}
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
          onContinue={() => setScreen("expenses")}
        />
      )}

      {screen === "expenses" && trip && (
        <section className="welcome-card">
          <p className="eyebrow">STEP 3 · EXPENSES</p>

          <h1>{trip.name}</h1>

          <p className="subtitle">
            Your group has {trip.friends.length} participants.
            Next, we'll build the expense tracker.
          </p>

          <h2>Who's on this trip?</h2>

          <ul className="friends-list">
            {trip.friends.map((friend) => (
              <li key={friend} className="friend-row">
                {friend}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;
