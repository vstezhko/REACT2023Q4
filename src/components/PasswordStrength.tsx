import zxcvbn from 'zxcvbn';

const PasswordStrength = ({ password }: { password: string }) => {
  const result = zxcvbn(password);

  return (
    <div className="passwordStrength">
      <progress
        className={`passwordStrength__progress`}
        value={result.score}
        max="4"
      />
    </div>
  );
};

export default PasswordStrength;
