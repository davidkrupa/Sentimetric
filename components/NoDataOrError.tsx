import { ErrorMessage } from "@/types";

type NoDataOrErrorProps = {
  defaultText?: string;
  error?: ErrorMessage;
};

const NoDataOrError = ({ defaultText, error }: NoDataOrErrorProps) => {
  return (
    <>
      {error ? (
        <p className="text-destructive text-sm">{error}</p>
      ) : (
        <p className="text-sm text-muted-foreground">{defaultText}</p>
      )}
    </>
  );
};

export default NoDataOrError;
