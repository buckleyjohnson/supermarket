import { Box } from './FancyBox';
import appleImg from '../images/apple.jpeg';
import * as styles from '../styles/ProductCard.css';

function ProductCard() {
    return (
        <Box
            className={styles.card}
            p={{ mobile: 'sm', desktop: 'md' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="sm"
            background="surface"
            borderRadius="md"
            boxShadow="0 2px 8px rgba(0,0,0,0.08)"
            width={{ mobile: '100%', desktop: 320 }}
            maxWidth={320}
            transition="box-shadow 0.2s"
        >
            <img src={appleImg} alt="Apple" width={220} />
            <h3>Apple</h3>
            <p>$1.25</p>
        </Box>
    );
}

export default ProductCard;