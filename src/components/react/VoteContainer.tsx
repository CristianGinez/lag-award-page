import React from 'react';
import { useStore } from '@nanostores/react';
import { $selectedCategory, $selectedNominee } from '../../stores/uiStore';
import { VoteButton } from './VoteButton';

export const VoteContainer = () => {
    const category = useStore($selectedCategory);
    const nominee = useStore($selectedNominee);

    if (!category || !nominee) return null;

    return <VoteButton category={category} nominee={nominee} />;
};