// Creates a clone of saved sequence to ensure the original sequence can always be selected after "sequence" is edited.
export function cloneSequence(sequence) {
  return sequence.map((instrument) => instrument.map((beat) => ({ ...beat })));
}
