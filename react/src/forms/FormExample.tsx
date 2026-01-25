import useForm from "./useForm";

export default function App() {
  const form = useForm({
    defaultValues: {
      username: "dummy",
      password: "password",
      askToFillAddress: false,
      address: "",
    },
    validators: (values) => {
      if (!values.username) {
        return { username: "Username is required" };
      }
      if (!values.password) {
        return { password: "Password is required" };
      }
      if (values.askToFillAddress && !values.address) {
        return { address: "Address is required when asked to fill" };
      }
      return true;
    },
    onSubmit: async (values) => {
      await new Promise((res) => setTimeout(res, 1000));
      console.log("Submitted values:", values);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <h2>Login</h2>

      {/* Username */}
      <form.Field name="username">
        {({ value, onChange, error }) => (
          <div>
            <input
              placeholder="Username"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {error && <span>{error}</span>}
          </div>
        )}
      </form.Field>

      {/* Password */}
      <form.Field name="password">
        {({ value, onChange, error }) => (
          <div>
            <input
              type="password"
              placeholder="Password"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />{" "}
            {error && <span>{error}</span>}
          </div>
        )}
      </form.Field>
      {/* Ask Address */}
      <form.Field name="askToFillAddress">
        {({ value, onChange, error }) => (
          <div>
            <input
              type="checkbox"
              placeholder="Password"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />{" "}
            {error && <span>{error}</span>}
          </div>
        )}
      </form.Field>

      {/* Subscribe to show only if asking address */}
      <form.Subscribe selector={(s) => s.values.askToFillAddress}>
        {(isShowAddress: boolean) => {
          if (!isShowAddress) return null;
          return (
            <>
              <form.Field name="address">
                {({ value, onChange, error }) => (
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />{" "}
                    {error && <span>{error}</span>}
                  </div>
                )}
              </form.Field>
            </>
          );
        }}
      </form.Subscribe>
      {/* Subscribe only to isSubmitting */}
      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting: boolean) => (
          <>
            <button type="button" disabled={isSubmitting} onClick={form.reset}>
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </>
        )}
      </form.Subscribe>
    </form>
  );
}
