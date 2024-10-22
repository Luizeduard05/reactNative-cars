package com.revisao_carro.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.revisao_carro.entities.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

/*
 *Serviço responsável pela criação e validação de tokens JWT.
 * Utiliza biblioteca Auth0 para criar e verificar tokens
 */
@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public DecodedJWT verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("api-auth-login") // Deve coincidir com o emissor usado no token
                    .build(); // Reutiliza a instância de JWTVerifier
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT;
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Token inválido ou expirado");
        }
    }

    public String getUsernameFromToken(String token) {
        DecodedJWT decodedJWT = verifyToken(token);
        return decodedJWT.getSubject();
    }

    public String generateToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("api-auth-login")
                    .withSubject(usuario.getEmail())
                    .withExpiresAt(this.generateExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro na autenticação");
        }
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("api-auth-login")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException exception){
            return null;
        }
    }

    private Instant generateExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-3"));

    }
}