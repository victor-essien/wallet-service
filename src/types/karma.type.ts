// Define the type and response for Karma

export interface KarmaResponse {
    status: string;
     data?: {
    karma_identity: string;
    amount_in_contention: string;
    reason: string | null;
    default_date: string;
    karma_type: {
      karma: string;
    };
    karma_identity_type: {
      identity_type: string;
    };
    reporting_entity: {
      name: string;
      email: string;
    };
  };
}