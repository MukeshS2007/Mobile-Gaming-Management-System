package com.mobilegaming.domain;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.*;
import org.springframework.web.cors.*;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.*;
import java.util.*;
@Service
class JwtService {
 private final byte[] secret;
 JwtService(@Value("${app.jwt.secret}") String secret){
  this.secret=secret.getBytes(StandardCharsets.UTF_8);
 }
 String create(User u){
  return Jwts.builder()
          .subject(u.id.toString())
          .claim("username",u.username)
          .claim("role",u.role.name())
          .issuedAt(new Date())
          .expiration(Date.from(Instant.now().plus(roleHours(u.role),java.time.temporal.ChronoUnit.HOURS)))
          .signWith(Keys.hmacShaKeyFor(secret),Jwts.SIG.HS512)
          .compact();
 }
 UUID userId(String token){
  return UUID.fromString(Jwts.parser()
          .verifyWith(Keys.hmacShaKeyFor(secret))
          .build()
          .parseSignedClaims(token)
          .getPayload()
          .getSubject());
 }
 private long roleHours(Role r){
  return switch(r){
   case PLAYER,GUEST -> 1;
   case GAME_DEVELOPER,QA_TESTER -> 4;
   case COMMUNITY_MANAGER,DATA_ANALYST,LIVE_OPS_MANAGER -> 8;
   case ADMIN -> 12;
  };
 }
}
@Component
class JwtFilter extends OncePerRequestFilter {
 private final JwtService jwt;
 private final UserRepository users;
 JwtFilter(JwtService jwt,UserRepository users){
  this.jwt=jwt;
  this.users=users;
 }
 @Override
 protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws ServletException,IOException{
  String h=req.getHeader(HttpHeaders.AUTHORIZATION);
  if(h!=null&&h.startsWith("Bearer "))
   try{
    User u=users.findById(jwt.userId(h.substring(7))).orElseThrow();
    if(u.active&&!u.banned){
     var a=new UsernamePasswordAuthenticationToken(u.id,null,List.of(new SimpleGrantedAuthority("ROLE_"+u.role)));
     SecurityContextHolder.getContext().setAuthentication(a);
    }
   }catch(JwtException|IllegalArgumentException ignored){}
  chain.doFilter(req,res);
 }
}
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfiguration {
 private final JwtFilter jwtFilter;
 SecurityConfiguration(JwtFilter f){
  jwtFilter=f;
 }
 @Bean
 PasswordEncoder passwordEncoder(){
  return new BCryptPasswordEncoder();
 }
 @Bean
 SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
  return http
          .csrf(c->c.disable())
          .cors(c->{})
          .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .authorizeHttpRequests(a->a
                  .requestMatchers("/auth/**","/games/**","/events/active","/actuator/**","/error").permitAll()
                  .anyRequest().authenticated())
          .addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class)
          .build();
 }
 @Bean
 CorsConfigurationSource corsConfigurationSource(@Value("${app.cors-origins}") List<String> origins){
  var c=new CorsConfiguration();
  c.setAllowedOrigins(origins);
  c.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
  c.setAllowedHeaders(List.of("Authorization","Content-Type"));
  var s=new UrlBasedCorsConfigurationSource();
  s.registerCorsConfiguration("/**",c);
  return s;
 }
}