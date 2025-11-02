import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  Modal,
  PanResponder,
} from 'react-native';
import { COLORS } from '../constants/colors';
import {
  generateJigsawPieces,
  shuffleJigsawPieces,
  isJigsawSolved,
  canPlacePiece,
  placePiece,
  removePieceFromBoard,
  getPieceAtPosition,
  shouldSnapToPosition,
  calculateJigsawPieceSize,
  getJigsawBoardDimensions,
  getSnapTolerance,
} from '../utils/jigsawLogic';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const JigsawGrid = ({
  gridSize,
  imageUrl,
  onPiecePlaced,
  onPieceRemoved,
  moveCount,
  maxMoves,
  showHints,
  restartCount,
}) => {

  const [pieces, setPieces] = useState([]);
  const [placedPieces, setPlacedPieces] = useState({});
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [showSnapIndicator, setShowSnapIndicator] = useState(false);
  
  const pieceSize = calculateJigsawPieceSize(gridSize);
  const { boardWidth, boardHeight } = getJigsawBoardDimensions(gridSize, pieceSize);
  const snapTolerance = getSnapTolerance(pieceSize);
  
  const containerWidth = screenWidth * 0.9;
  // Calculate dynamic container height based on number of pieces
  const unplacedPieces = pieces.filter(p => !p.isPlaced).length;
  const piecesPerRow = Math.floor((containerWidth - 30) / 70); // 70px approx piece width with padding
  const rowsNeeded = Math.ceil(unplacedPieces / piecesPerRow);
  const minContainerHeight = Math.max(screenHeight * 0.2, rowsNeeded * 80 + 60); // 80px per row + 60px for label
  const containerHeight = Math.min(minContainerHeight, screenHeight * 0.35);
  
  const pieceAnimations = useRef(new Map()).current;
  
  // Create pan responder for drag functionality
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const pieceId = parseInt(evt.nativeEvent.target);
        const piece = pieces.find(p => p.id === pieceId);
        if (piece) {
          setSelectedPiece(piece);
          setDraggedPiece(piece);
          setShowSnapIndicator(false);
          setDropTarget(null);
          
          // Remove piece from board if it was placed
          if (piece.isPlaced) {
            const updatedPieces = removePieceFromBoard(piece, pieces, containerWidth, containerHeight);
            setPieces(updatedPieces);
            setPlacedPieces(prev => {
              const newPlaced = { ...prev };
              delete newPlaced[piece.currentPosition];
              return newPlaced;
            });
            onPieceRemoved && onPieceRemoved();
          }
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // Update piece position during drag
        const pieceId = parseInt(evt.nativeEvent.target);
        const piece = pieces.find(p => p.id === pieceId);
        if (piece && !piece.isPlaced) {
          const anim = pieceAnimations.get(piece.id);
          if (anim) {
            anim.setValue({
              x: piece.currentX + gestureState.dx,
              y: piece.currentY + gestureState.dy,
            });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const pieceId = parseInt(evt.nativeEvent.target);
        const piece = pieces.find(p => p.id === pieceId);
        if (!piece) return;
        
        const { dx, dy } = gestureState;
        const newX = piece.currentX + dx;
        const newY = piece.currentY + dy;
        
        // Check if piece is over board area
        const boardStartX = (screenWidth - boardWidth) / 2;
        const boardStartY = screenHeight * 0.25;
        
        if (newX >= boardStartX && newX <= boardStartX + boardWidth &&
            newY >= boardStartY && newY <= boardStartY + boardHeight) {
          
          // Calculate which grid position this corresponds to
          const gridCol = Math.floor((newX - boardStartX) / pieceSize);
          const gridRow = Math.floor((newY - boardStartY) / pieceSize);
          const targetPosition = gridRow * gridSize + gridCol;
          
          if (targetPosition >= 0 && targetPosition < gridSize * gridSize) {
            const targetX = boardStartX + gridCol * pieceSize;
            const targetY = boardStartY + gridRow * pieceSize;
            
            if (shouldSnapToPosition(newX, newY, targetX, targetY, snapTolerance)) {
              if (canPlacePiece(piece, targetPosition, placedPieces)) {
                // Place piece on board
                const updatedPieces = placePiece(piece, targetPosition, pieces);
                setPieces(updatedPieces);
                setPlacedPieces(prev => ({
                  ...prev,
                  [targetPosition]: piece,
                }));
                
                // Animate piece to position
                const anim = pieceAnimations.get(piece.id);
                if (anim) {
                  Animated.spring(anim, {
                    toValue: { x: targetX, y: targetY },
                    useNativeDriver: false,
                    tension: 100,
                    friction: 8,
                  }).start();
                }
                
                onPiecePlaced && onPiecePlaced();
                
                // Check if puzzle is solved
                if (isJigsawSolved(updatedPieces)) {
                  setTimeout(() => {
                    console.log('Jigsaw puzzle completed!');
                  }, 500);
                }
              }
            }
          }
        }
        
        // Reset piece position if not placed
        if (!piece.isPlaced) {
          const anim = pieceAnimations.get(piece.id);
          if (anim) {
            Animated.spring(anim, {
              toValue: { x: piece.currentX, y: piece.currentY },
              useNativeDriver: false,
              tension: 100,
              friction: 8,
            }).start();
          }
        }
        
        setDraggedPiece(null);
        setSelectedPiece(null);
        setDropTarget(null);
        setShowSnapIndicator(false);
      },
    })
  ).current;

  // Initialize jigsaw pieces
  useEffect(() => {
    const newPieces = generateJigsawPieces(gridSize, pieceSize);
    const shuffledPieces = shuffleJigsawPieces(newPieces, containerWidth, containerHeight);
    setPieces(shuffledPieces);
    setPlacedPieces({});
  }, [gridSize, pieceSize, containerWidth, containerHeight]);

  // Initialize animations for pieces
  useEffect(() => {
    pieces.forEach(piece => {
      if (!pieceAnimations.has(piece.id)) {
        pieceAnimations.set(piece.id, new Animated.ValueXY({
          x: piece.currentX || 0,
          y: piece.currentY || 0,
        }));
      }
    });
  }, [pieces]);

  const renderJigsawPiece = (piece) => {
    const anim = pieceAnimations.get(piece.id);
    if (!anim) return null;

    if (piece.isPlaced) {
      // Render placed piece on board
      const row = Math.floor(piece.currentPosition / gridSize);
      const col = piece.currentPosition % gridSize;
      const boardStartX = (screenWidth - boardWidth) / 2;
      const boardStartY = screenHeight * 0.25;
      
      return (
        <Animated.View
          key={piece.id}
          style={[
            styles.placedPiece,
            {
              width: pieceSize,
              height: pieceSize,
              left: boardStartX + col * pieceSize,
              top: boardStartY + row * pieceSize,
              transform: [
                { translateX: anim.x },
                { translateY: anim.y },
              ],
            },
          ]}
        >
          <View style={styles.pieceContainer}>
            <Image
              source={imageUrl}
              style={[
                styles.pieceImage,
                {
                  width: gridSize * pieceSize,
                  height: gridSize * pieceSize,
                  // Position image to show the correct portion
                  left: -((piece.correctPosition % gridSize) * pieceSize),
                  top: -(Math.floor(piece.correctPosition / gridSize) * pieceSize),
                },
              ]}
            />
            {/* Hint number overlay */}
            {showHints && (
              <View style={styles.hintOverlay}>
                <Text style={styles.hintNumber}>
                  {piece.correctPosition + 1}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      );
    } else {
      // Render scattered piece
      return (
        <Animated.View
          key={piece.id}
          style={[
            styles.scatteredPiece,
            {
              width: pieceSize,
              height: pieceSize,
              transform: [
                { translateX: anim.x },
                { translateY: anim.y },
                { rotate: `${piece.rotation || 0}deg` },
                { scale: selectedPiece?.id === piece.id ? 1.1 : 1 },
              ],
              zIndex: selectedPiece?.id === piece.id ? 1000 : 1,
              shadowColor: selectedPiece?.id === piece.id ? COLORS.gold : COLORS.black,
              shadowOffset: { width: 0, height: selectedPiece?.id === piece.id ? 8 : 4 },
              shadowOpacity: selectedPiece?.id === piece.id ? 0.6 : 0.3,
              shadowRadius: selectedPiece?.id === piece.id ? 12 : 6,
              elevation: selectedPiece?.id === piece.id ? 12 : 4,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.pieceContainer}>
            <Image
              source={imageUrl}
              style={[
                styles.pieceImage,
                {
                  width: gridSize * pieceSize,
                  height: gridSize * pieceSize,
                  // Position image to show the correct portion
                  left: -((piece.correctPosition % gridSize) * pieceSize),
                  top: -(Math.floor(piece.correctPosition / gridSize) * pieceSize),
                },
              ]}
            />
            {/* Hint number overlay */}
            {showHints && (
              <View style={styles.hintOverlay}>
                <Text style={styles.hintNumber}>
                  {piece.correctPosition + 1}
                </Text>
                </View>
            )}
          </View>
        </Animated.View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Stats Display */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Try</Text>
          <Text style={styles.statValue}>{restartCount}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Moves</Text>
          <Text style={styles.statValue}>{moveCount}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Limit</Text>
          <Text style={styles.statValue}>{maxMoves}</Text>
        </View>
      </View>

      {/* Preview Image */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewLabel}>Preview</Text>
        <TouchableOpacity onPress={() => setShowPreviewModal(true)} activeOpacity={0.8}>
          <Image
            source={imageUrl}
            style={styles.previewImage}
          />
        </TouchableOpacity>
      </View>

      {/* Jigsaw Board */}
      <View style={styles.boardContainer}>
        <View
          style={[
            styles.jigsawBoard,
            {
              width: boardWidth,
              height: boardHeight,
            },
          ]}
        >
      {/* Grid lines for visual guidance */}
      {Array.from({ length: gridSize }).map((_, row) => (
        <View key={`row-${row}`} style={styles.gridRow}>
          {Array.from({ length: gridSize }).map((_, col) => {
            const position = row * gridSize + col;
            const isDropTarget = dropTarget === position;
            const isOccupied = placedPieces[position];
            
            return (
              <View
                key={`col-${col}`}
                style={[
                  styles.gridCell,
                  {
                    width: pieceSize,
                    height: pieceSize,
                  },
                  isDropTarget && styles.dropTargetCell,
                  isOccupied && styles.occupiedCell,
                ]}
              >
                {showSnapIndicator && isDropTarget && (
                  <View style={styles.snapIndicator} />
                )}
              </View>
            );
          })}
        </View>
      ))}
        </View>
      </View>

      {/* Scattered Pieces Area */}
      <View style={[styles.scatteredArea, { height: containerHeight }]}>
        <Text style={styles.scatteredLabel}>
          Drag pieces to the board
        </Text>
        {pieces.filter(piece => !piece.isPlaced).map(piece => renderJigsawPiece(piece))}
      </View>

      {/* Placed Pieces */}
      {pieces.filter(piece => piece.isPlaced).map(piece => renderJigsawPiece(piece))}

      {/* Fullscreen Preview Modal */}
      <Modal
        visible={showPreviewModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPreviewModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            activeOpacity={1}
            onPress={() => setShowPreviewModal(false)}
          >
            <View style={styles.modalContent}>
              <Image
                source={imageUrl}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowPreviewModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>✕ Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: COLORS.white + '20',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  statLabel: {
    color: COLORS.light,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewLabel: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.gold,
    resizeMode: 'cover',
  },
  boardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  jigsawBoard: {
    backgroundColor: COLORS.darker,
    borderWidth: 3,
    borderColor: COLORS.accent,
    borderRadius: 12,
    position: 'relative',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    borderWidth: 1,
    borderColor: COLORS.white + '20',
    position: 'relative',
  },
  dropTargetCell: {
    backgroundColor: COLORS.gold + '20',
    borderColor: COLORS.gold,
  },
  occupiedCell: {
    backgroundColor: COLORS.white + '10',
  },
  snapIndicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderWidth: 2,
    borderColor: COLORS.gold,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  scatteredArea: {
    width: '100%',
    backgroundColor: COLORS.white + '10',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white + '20',
    position: 'relative',
    marginBottom: 20,
  },
  scatteredLabel: {
    position: 'absolute',
    top: 10,
    left: 20,
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '600',
    zIndex: 10,
  },
  placedPiece: {
    position: 'absolute',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  scatteredPiece: {
    position: 'absolute',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.gray,
  },
  pieceContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  pieceImage: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  hintOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  hintNumber: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  fullscreenImage: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    borderRadius: 12,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: COLORS.darker,
    fontSize: 16,
    fontWeight: '700',
  },
});