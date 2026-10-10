
import { useState, type FormEvent } from "react";

type AddFriendsProps = {
  tripName: string;
  friends: string[];
  onAddFriend: (name: string) => void;
  onRemoveFriend: (name: string) => void;
  onContinue: () => void;
};

function AddFriends({
  tripName,
  friends,
  onAddFriend,
  onRemoveFriend,
  onContinue,
}: AddFriendsProps) {
  const [friendName, setFriendName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = friendName.trim();

    if (!name) {
      setError("Please enter your friend's name.");
      return;
    }

    if (friends.some((friend) =>
      friend.toLowerCase() === name.toLowerCase()
    )) {
      setError("This person has already been added.");
      return;
    }

    onAddFriend(name);
    setFriendName("");
    setError("");
  }

  return (
    <section className="welcome-card">
      <p className="eyebrow">STEP 2 · TRAVEL COMPANIONS</p>

      <h1>{tripName}</h1>

      <p className="subtitle">
        Who's coming along? Add everyone sharing the trip expenses.
      </p>

      <form onSubmit={handleSubmit} className="trip-form">
        <label htmlFor="friendName">Friend's name</label>

        <input
          id="friendName"
          type="text"
          placeholder="e.g. Alex"
          value={friendName}
          onChange={(event) => {
            setFriendName(event.target.value);
            setError("");
          }}
          maxLength={50}
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">+ Add friend</button>
      </form>

      <div className="friends-section">
        <h2>Who's in the trip? ({friends.length})</h2>

        <ul className="friends-list">
          {friends.map((friend) => ( //.map() displays every friend in the list, and adds a remove button for each friend except "You"
            <li key={friend} className="friend-row">
              <span>{friend}</span>

              {friend !== "You" && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => onRemoveFriend(friend)}
                  aria-label={`Remove ${friend}`}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="continue-button"
        onClick={onContinue}
        disabled={friends.length < 2} // continue botton is disabled until at least 2 friends are added
      >
        Continue to expenses →
      </button>

      {friends.length < 2 && (
        <p className="helper-text">
          Add at least one friend to continue.
        </p>
      )}
    </section>
  );
}

export default AddFriends;
