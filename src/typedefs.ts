export type controlLimitsObject = {
  labels: string[];
  values: number[];
  numerators?: number[];
  denominators?: number[];
  targets: number[];
  ll99?: number[];
  ll95?: number[];
  ll68?: number[];
  ul68?: number[];
  ul95?: number[];
  ul99?: number[];
  count?: number[];
  alt_targets?: number[];
};

export type controlLimitsArgs = {
  labels: string[];
  numerators: number[];
  denominators?: number[];
  outliers_in_limits?: boolean;
  xbar_sds?: number[];
}
