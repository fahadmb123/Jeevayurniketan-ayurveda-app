import { useState, useEffect } from 'react';
import { teamService } from '../services/teamService';
import type { TeamMember } from '../types';

export const useTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    teamService.getTeamMembers().then((data) => {
      if (mounted) {
        setMembers(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { members, loading };
};
