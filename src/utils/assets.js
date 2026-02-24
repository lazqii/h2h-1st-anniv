const allModules = import.meta.glob('../assets/img/**/*.{png,jpg,jpeg,webp}', { eager: true });

export const eraAssetsMap = {
    intro: {
        preDebut: []
    },
    debut: {
        id: 'the_chase_era',
        group: [],
        members: { jiwoo: [], carmen: [], yuha: [], stella: [], juun: [], 'a-na': [], ian: [], 'ye-on': [] },
        cover: null,
        outro: null
    },
    cb1: {
        id: 'style_era',
        group: [],
        members: { jiwoo: [], carmen: [], yuha: [], stella: [], juun: [], 'a-na': [], ian: [], 'ye-on': [] },
        cover: null,
        outro: null
    },
    cb2: {
        id: 'pretty_please_era',
        group: [],
        members: { jiwoo: [], carmen: [], yuha: [], stella: [], juun: [], 'a-na': [], ian: [], 'ye-on': [] },
        cover: null,
        outro: null
    },
    cb3: {
        id: 'focus_era',
        group: [],
        members: { jiwoo: [], carmen: [], yuha: [], stella: [], juun: [], 'a-na': [], ian: [], 'ye-on': [] },
        cover: null,
        outro: null,
        bookImages: [],
        teaser2Images: []
    },
    cb4: {
        id: 'rude_era',
        group: [],
        members: { jiwoo: [], carmen: [], yuha: [], stella: [], juun: [], 'a-na': [], ian: [], 'ye-on': [] },
        cover: null,
        outro: null
    }
};

Object.keys(allModules).forEach(path => {
    const url = allModules[path].default;
    const normalizedPath = path.toLowerCase();

    // Map Pre-debut
    if (normalizedPath.includes('/img/the_chase_era/pre-debut/')) {
        eraAssetsMap.intro.preDebut.push(url);
    }

    // Map Eras
    ['debut', 'cb1', 'cb2', 'cb3', 'cb4'].forEach(eraKey => {
        const eraData = eraAssetsMap[eraKey];

        if (normalizedPath.includes(`/img/${eraData.id}/`)) {

            if (normalizedPath.includes('all_member/') || normalizedPath.includes('/all/')) {
                eraData.group.push(url);
            } else if (normalizedPath.includes('image_teaser_1/')) {
                // Specific mapping for Focus era book layout
                if (eraKey === 'cb3') {
                    eraData.bookImages.push(url);
                }
            } else if (normalizedPath.includes('image_teaser_2/')) {
                if (eraKey === 'cb3') {
                    eraData.teaser2Images.push(url);
                }
            } else if (normalizedPath.includes('polaroid1.png') && eraKey === 'cb2') {
                eraData.outro = url;
            } else if (normalizedPath.includes('hearts2hearts_-_') || normalizedPath.includes('the chase.jpg') || (normalizedPath.includes('0033.jpg') && eraKey === 'cb3')) {
                if (!eraData.cover) eraData.cover = url;
            } else {
                Object.keys(eraData.members).forEach(member => {
                    // special case for 'ye-on' folder named 'yeon' in cb4
                    const isYeonSpecial = member === 'ye-on' && normalizedPath.includes('/yeon/');
                    if (normalizedPath.includes(`/${member}/`) || isYeonSpecial) {
                        eraData.members[member].push(url);
                    }
                });
            }
        }
    });
});

// Outro specific logic (usually the last group photo)
const chaseOutro = eraAssetsMap.debut.group.find(url => url.includes('hearts2hearts-20260220-0137'));
if (chaseOutro) eraAssetsMap.debut.outro = chaseOutro;

const focusOutro = eraAssetsMap.cb3.group.find(url => url.includes('closing2.png'));
if (focusOutro) eraAssetsMap.cb3.outro = focusOutro;

// Helper functions for components
export const getPreDebutImage = () => {
    return eraAssetsMap.intro.preDebut.length > 0 ? eraAssetsMap.intro.preDebut[0] : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
};

export const getEraCoverImage = (eraId) => {
    const eraData = eraAssetsMap[eraId];
    if (eraData) {
        if (eraData.group && eraData.group.length > 0) return eraData.group[0];
        if (eraData.cover) return eraData.cover;
        if (eraId === 'intro' && eraData.preDebut && eraData.preDebut.length > 0) return eraData.preDebut[0];
    }
    return `https://picsum.photos/seed/${eraId}group/800/500`;
};

export const getEraOutroImage = (eraId) => {
    const eraData = eraAssetsMap[eraId];
    if (eraData && eraData.outro) return eraData.outro;

    // Fall back to just the last group photo if no explicit outro manually mapped
    if (eraData && eraData.group.length > 0) return eraData.group[eraData.group.length - 1];

    return null;
}

export const getMemberImage = (eraId, memberName) => {
    const eraData = eraAssetsMap[eraId];
    if (eraData) {
        const photos = eraData.members[memberName.toLowerCase()];
        if (photos && photos.length > 0) {
            if (eraId === 'cb1') {
                const overrides = {
                    'carmen': '20260221-0031',
                    'yuha': '20260221-0004',
                    'stella': '20260221-0027',
                    'a-na': '20260221-0008',
                    'ye-on': '20260221-0019'
                };
                const overMatch = overrides[memberName.toLowerCase()];
                if (overMatch) {
                    const specificPhoto = photos.find(url => url.includes(overMatch));
                    if (specificPhoto) return specificPhoto;
                }
            }
            return photos[0];
        }
    }
    return `https://picsum.photos/seed/${eraId}-${memberName}/400/500`;
};

export const getEraPhotoboothImages = (eraId) => {
    const eraData = eraAssetsMap[eraId];
    if (eraData && eraData.group.length > 0) {
        return eraData.group.slice(0, 3);
    }
    return [
        `https://picsum.photos/seed/${eraId}1/800/500`,
        `https://picsum.photos/seed/${eraId}2/800/500`,
        `https://picsum.photos/seed/${eraId}3/800/500`
    ];
};

export const getEraBookImages = (eraId) => {
    const eraData = eraAssetsMap[eraId];
    if (eraData && eraData.bookImages && eraData.bookImages.length > 0) {
        // Sort to ensure correct odd/even numerical ordering based on filename
        return [...eraData.bookImages].sort((a, b) => {
            const numA = parseInt(a.match(/(\d+)\.jpg/)?.[1] || 0);
            const numB = parseInt(b.match(/(\d+)\.jpg/)?.[1] || 0);
            return numA - numB;
        });
    }
    return [];
};

export const getEraPrettyPleaseImages = () => {
    const eraData = eraAssetsMap['cb2'];
    if (eraData && eraData.group && eraData.group.length > 0) {
        return [...eraData.group].sort((a, b) => a.localeCompare(b));
    }
    return [];
};

export const getEraTeaser2Images = (eraId) => {
    const eraData = eraAssetsMap[eraId];
    if (eraData && eraData.teaser2Images && eraData.teaser2Images.length > 0) {
        // Prepend specific all_member photos
        const prependVars = ['0033', '0034', '0035', '0036'];
        const prependPhotos = eraData.group.filter(url =>
            prependVars.some(req => url.includes(`hearts2hearts-20260221-${req}`))
        ).sort((a, b) => a.localeCompare(b));

        // Center teaser images (0001-0006)
        const requestedVars = ['0001', '0002', '0003', '0004', '0005', '0006'];
        const corePhotos = eraData.teaser2Images.filter(url =>
            requestedVars.some(req => url.includes(`hearts2hearts-20260221-${req}`))
        ).sort((a, b) => {
            const numA = parseInt(a.match(/(\d+)\.jpg/)?.[1] || 0);
            const numB = parseInt(b.match(/(\d+)\.jpg/)?.[1] || 0);
            return numA - numB;
        });

        // Append specific all_member photos
        const appendVars = ['0038', '0039', '0043'];
        const appendPhotos = eraData.group.filter(url =>
            appendVars.some(req => url.includes(`hearts2hearts-20260221-${req}`))
        ).sort((a, b) => a.localeCompare(b));

        return [...prependPhotos, ...corePhotos, ...appendPhotos];
    }
    return [];
}

export const getMemberGalleryImages = (eraId, memberName) => {
    const eraData = eraAssetsMap[eraId];

    if (eraId === 'debut' && eraData) {
        if (memberName.toLowerCase() === 'all members') {
            const requestedPhotos = [
                'hearts2hearts-20260220-0068',
                'hearts2hearts-20260220-0008',
                'hearts2hearts-20260220-0172',
                'hearts2hearts-20260220-0174',
                'hearts2hearts-20260220-0166'
            ];

            const reqUrlPhotos = eraData.group.filter(url =>
                requestedPhotos.some(req => url.includes(req))
            );

            const allMemberCover = eraData.group.find(url => url.includes('all-member'));

            const finalPhotos = [];
            if (allMemberCover) finalPhotos.push(allMemberCover);
            finalPhotos.push(...reqUrlPhotos);

            return finalPhotos.length > 0 ? finalPhotos : eraData.group;
        }
    }

    if (eraData) {
        if (memberName.toLowerCase() === 'all members') {
            if (eraId === 'cb3') return getEraTeaser2Images(eraId);
            return eraData.group.length > 0 ? eraData.group : [`https://picsum.photos/seed/${eraId}-all/800/1200`];
        }

        const photos = eraData.members[memberName.toLowerCase()];
        if (photos && photos.length > 0) return photos;
    }

    return Array.from({ length: 4 }).map((_, i) =>
        `https://picsum.photos/seed/${eraId}-${memberName}-gal-${i}/800/1200`
    );
};
