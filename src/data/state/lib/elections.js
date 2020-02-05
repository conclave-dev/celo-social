import { normalize, schema } from 'normalizr';

const electionCandidateSchema = new schema.Entity('electionCandidate');

const normalizeElectionCandidates = data => normalize(data, electionCandidateSchema);

export { normalizeElectionCandidates };
