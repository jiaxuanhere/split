
import { useState, type FormEvent } from "react";

type TripNameFormProps = {
  onCreateTrip: (name: string) => void;
};

function TripNameForm({ onCreateTrip }: TripNameFormProps) {
  const [tripName, setTripName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = tripName.trim();

    if (!trimmedName) {
      setError("Please enter a trip name.");
      return;
    }

    onCreateTrip(trimmedName);
  }

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <label htmlFor="tripName">Name this trip</label>

      <input
        id="tripName"
        type="text"
        placeholder="e.g. Boys trip to bali"
        value={tripName}
        onChange={(event) => {
          setTripName(event.target.value);
          setError("");
        }}
        maxLength={80}
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit">Create trip</button>
    </form>
  );
}

export default TripNameForm;
